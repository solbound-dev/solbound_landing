import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from '@solana/actions'
import { Connection, PublicKey, VersionedTransaction, clusterApiUrl } from '@solana/web3.js'
import axios from 'axios'
import { getAssociatedTokenAddressSync } from '@solana/spl-token'
import queryString from 'query-string'

export const GET = async (req: Request) => {
  const { query } = queryString.parseUrl(req.url)
  const { data } = await axios.get(`https://pumpportal.fun/api/data/token-info`, {
    params: {
      ca: query.ca
    }
  })

  const payload: ActionGetResponse = {
    icon: data.data.image,
    label: data.data.symbol,
    description: data.data.description,
    title: data.data.name,
    links: {
      actions: [
        {
          label: '🟢 0.1 ◎',
          href: `/api/actions/trade?amount=0.1&ca=${query.ca}&action=buy`
        },
        {
          label: '🟢 1 ◎',
          href: `/api/actions/trade?amount=1&ca=${query.ca}&action=buy`
        },
        {
          label: '🟢 10 ◎',
          href: `/api/actions/trade?amount=10&ca=${query.ca}&action=buy`
        },
        {
          label: '🔴 25%',
          href: `/api/actions/trade?amount=25&ca=${query.ca}&action=sell`
        },
        {
          label: '🔴 50%',
          href: `/api/actions/trade?amount=50&ca=${query.ca}&action=sell`
        },
        {
          label: '🔴 100%',
          href: `/api/actions/trade?amount=100&ca=${query.ca}&action=sell`
        },
        {
          label: 'Buy',
          href: `/api/actions/trade?amount={amount}&ca=${query.ca}&action=buy`,
          parameters: [
            {
              name: 'amount',
              label: 'Enter custom amount in SOL'
            }
          ]
        },
        {
          label: 'Sell',
          href: `/api/actions/trade?amount={amount}&ca=${query.ca}&action=sell`,
          parameters: [
            {
              name: 'amount',
              label: 'Enter custom amount in %'
            }
          ]
        }
      ]
    }
  }

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS
  })
}

export const OPTIONS = GET

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json()
    const { query } = queryString.parseUrl(req.url, { parseNumbers: true })

    let account: PublicKey
    try {
      account = new PublicKey(body.account)
    } catch (error) {
      return new Response('Invalid account provided', {
        status: 400,
        headers: ACTIONS_CORS_HEADERS
      })
    }

    const connection = new Connection(process.env.NEXT_PUBLIC_RPC_ENDPOINT || clusterApiUrl('mainnet-beta'))
    let balance = 0

    try {
      balance =
        (await connection.getTokenAccountBalance(getAssociatedTokenAddressSync(new PublicKey(query.ca || ''), new PublicKey(account))))
          .value.uiAmount || 0
    } catch {}

    const { data } = await axios.post(
      'https://pumpportal.fun/api/trade-local',
      {
        publicKey: account,
        action: query.action,
        mint: query.ca,
        denominatedInSol: query.action === 'buy' ? 'true' : 'false',
        amount: query.action === 'buy' ? query.amount : (+(query.amount || 0) / 100) * balance,
        slippage: 1,
        priorityFee: 0.00001,
        pool: 'pump'
      },
      { responseType: 'arraybuffer' }
    )

    const transaction = VersionedTransaction.deserialize(new Uint8Array(data))

    const payload: ActionPostResponse = {
      transaction: Buffer.from(transaction.serialize()).toString('base64')
    }

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS })
  } catch (error) {
    return Response.json('An error occurred', { status: 400, headers: ACTIONS_CORS_HEADERS })
  }
}
