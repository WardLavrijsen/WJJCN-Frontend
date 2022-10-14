import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "../components/navbar";
import { Card } from "flowbite-react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ brands, error }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className={styles.main}>
        {error ? (
          <div className="flex items-center justify-center gap-2 flex-col bg-red-600 text-white p-7 rounded-xl">
            <h1 className="text-3xl">ERROR:</h1>
            <h1>{error}</h1>
            <h2>Probeer later opnieuw</h2>
          </div>
        ) : (
          <div className={styles.cardGrid}>
            {brands.map((brand) => (
              <a href={"/" + brand.brand} key={brand._id["$oid"]}>
                <div className="max-w-sm">
                  <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {brand.retailers}
                    </h5>
                    {brand.products.map((product) => (
                      <h5
                        key={product.name}
                        className=" text-gray-900 dark:text-white"
                      >
                        {product.name}
                      </h5>
                    ))}
                  </Card>
                </div>
              </a>
            ))}
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
      `http://${url}/api/retailerbybrand?name=${context.query.id}`
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
        props: { brands: data.data, error: null },
      };
    }
  } catch (error) {
    return {
      error: error,
    };
  }
}
