import style from '../styles/pagesStyle/home.module.scss'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>V2 news | Início</title>
      </Head>
      <main className={style.contentContainer}>
        <section className={style.hero}>
          <h1>Bem vindo novamente, <span>Renan! 👋</span></h1>
        </section>
        <img src='/images/logoV2.png' alt='Logo' width='800px' />
        Todo: aparecer um botão para um user root para que possa fazer o cadastro
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KDnlWBeu0CCKros9ZBW0p0O', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format((price.unit_amount / 100)),
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 horas para revalidar
  }
}
