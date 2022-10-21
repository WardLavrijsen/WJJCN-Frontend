import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card } from "flowbite-react";

export default function Product({ products, error }) {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((obj) => {
    return obj.product === router.query.id;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {error ? (
          <div className="flex items-center justify-center gap-2 flex-col bg-red-600 text-white p-7 rounded-xl">
            <h1 className="text-3xl">ERROR:</h1>
            <h1>{error}</h1>
            <h2>Probeer later opnieuw</h2>
          </div>
        ) : (
          <div className={styles.cardGrid}>
            <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.product}
              </h5>
              <div>
                brand: {product.brand}
                <br></br>
                retailer: {product.retailer}
                <br></br>
                {Object.entries(product.product_brand).map(([key, value]) => {
                  return (
                    <div key={key}>
                      <h3>
                        {key}: {value}
                      </h3>
                      <br></br>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.headers.host;
  try {
    const res = await fetch(
      `http://${url}/api/product?name=${context.query.brand}&retailer=${context.query.retailer}`
    );
    const data = await res.json();
    if (data.status === "error") {
      return {
        props: {
          error: "Data kan niet opgehaald worden",
        },
      };
    } else {
      return {
        props: { products: data.data, error: null },
      };
    }
  } catch (error) {
    return {
      error: error,
    };
  }
}
