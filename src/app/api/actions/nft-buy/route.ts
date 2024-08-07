import axios from 'axios';
import queryString from 'query-string';

import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse } from '@solana/actions';
import { Connection, PublicKey, TransactionMessage, VersionedTransaction, clusterApiUrl } from '@solana/web3.js';

const connection = new Connection(process.env.NEXT_PUBLIC_RPC_ENDPOINT || clusterApiUrl('mainnet-beta'));

export const GET = async (req: Request) => {
  try {
    const { query } = queryString.parseUrl(req.url);

    const { data } = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${query.slug}/listings`, {
      params: {
        sort: 'listPrice',
        sort_direction: 'asc',
        limit: 2,
      },
      headers: {
        Authorization: `Bearer ${process.env.ME_API_KEY}`,
      },
    });

    const res = data[0];

    const payload: ActionGetResponse = {
      icon: res.token.image,
      label: `Buy`,
      description: `Buy ${res.token.name} for ${res.price} SOL`,
      title: res.token.name,
      links: {
        actions: [
          {
            label: 'BUY',
            href: `/api/actions/nft-buy?tokenMint=${res.tokenMint}`,
          },
        ],
      },
    };

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch {
    return Response.json('An error occurred', { status: 400, headers: ACTIONS_CORS_HEADERS });
  }
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json();
    const { query } = queryString.parseUrl(req.url);

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return new Response('Invalid account provided', {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    const tokenRes = await axios.get(`https://api-mainnet.magiceden.dev/v2/tokens/${query.tokenMint}/listings`, {
      headers: {
        Authorization: `Bearer ${process.env.ME_API_KEY}`,
      },
    });

    const token = tokenRes.data[0];

    if (!token) {
      return Response.json('Token already sold', { status: 400, headers: ACTIONS_CORS_HEADERS });
    }

    const { data } = await axios.get('https://api-mainnet.magiceden.dev/v2/instructions/buy_now', {
      params: {
        buyer: body.account,
        seller: token.seller,
        tokenATA: token.tokenAddress,
        auctionHouseAddress: token.auctionHouse,
        tokenMint: query.tokenMint,
        price: token.price,
        priorityFee: 20,
      },
      headers: {
        Authorization: `Bearer ${process.env.ME_API_KEY}`,
      },
    });

    const builtTx = VersionedTransaction.deserialize(new Uint8Array(data.txSigned.data));

    const transaction = new VersionedTransaction(
      new TransactionMessage({
        payerKey: account,
        instructions: [...TransactionMessage.decompile(builtTx.message).instructions],
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      }).compileToV0Message(),
    );

    const payload: ActionPostResponse = {
      transaction: Buffer.from(transaction.serialize()).toString('base64'),
    };

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (error) {
    console.log(error);
    return Response.json('An error occurred', { status: 400, headers: ACTIONS_CORS_HEADERS });
  }
};
