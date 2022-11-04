import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card } from "flowbite-react";

export default function Product({ products, error }) {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((obj) => {
    if (router.query.product == null) {
      return Object.values(obj);
    }
    return obj.product === router.query.product;
  });

  const clickRetailer = (product) => {
    router.push(`/${router.query.id}/${router.query.retailer}?product=${product}`)
  };

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
          <div>
            {products.map((product) => {
              return (
                <div key={product._id.$oid}>
                  <button onClick={() => clickRetailer(product.product)}>{product.product}</button>
                </div>
              );
            })}

            <div className={styles.cardGrid}>
              <Card>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {console.log(product)}
                  {product.retailer}
                </h5>
                <div>
                  <h3>{product.product}</h3>
                </div>
                {/* <div>
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
    </div> */}
              </Card>
            </div>
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
      `http://${url}/api/product?name=${context.query.id}&retailer=${context.query.retailer}`
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
