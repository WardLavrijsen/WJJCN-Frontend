import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "../components/navbar";
import BrandCard from "../components/brandCard";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ brands }) {
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
        <div className={styles.cardGrid}>
          {brands.map((brand) => (
            <a href={"/" + brand.name} key={brand.id}>
              <BrandCard key={brand.id} brand={brand} />
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const url = context.req.headers.host;
  const res = await fetch(`http://${url}/api/allbrands`);
  const data = await res.json();
  return {
    props: { brands: data.data },
  };
}
