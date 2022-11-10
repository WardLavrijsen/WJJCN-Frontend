import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { Accordion, Card } from "flowbite-react";

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
    router.push(
      `/${router.query.id}/${router.query.retailer}?product=${product}`
    );
  };
  
  const previousRetailer = () => {

  }

  const nextRetailer = () => {

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>WOC Live Score</title>
        <meta name="description" content="WOC live score dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} style={{ maxWidth: "100%" }}>
        {error ? (
          <div className="flex items-center justify-center gap-2 flex-col bg-red-600 text-white p-7 rounded-xl">
            <h1 className="text-3xl">ERROR:</h1>
            <h1>{error}</h1>
            <h2>Probeer later opnieuw</h2>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex" }}>
              <Card>
                <h5>IMAGE WoC</h5>
              </Card>
              <Card>
                <div style={{display: "flex"}}>
                  <h5>{product.retailer}</h5>
                  <button style={{backgroundColor: "lightBlue"}} onClick={() => previousRetailer()}>Previous Retailer</button>
                </div>
                <div style={{display: "flex"}}>
                  <p>percentage% overeenkomst</p>
                  <button style={{backgroundColor: "lightBlue"}} onClick={() => nextRetailer()}>Next Retailer</button>
                </div>
                <p>progress bar</p>
              </Card>
            </div>
            <div style={{ display: "flex" }}>
              <Card>
                {products.map((product) => {
                  return (
                    <div key={product._id.$oid}>
                      <button onClick={() => clickRetailer(product.product)}>
                        {product.product}
                      </button>
                    </div>
                  );
                })}
              </Card>
              <br></br>
              {console.log(product)}
              <Accordion style={{ backgroundColor: "white" }}>
                {Object.entries(product.product_brand).map(([key, value]) => {
                  return (
                    <Accordion.Panel key={key}>
                      <Accordion.Title>
                        <div style={{ display: "flex" }}>
                          <h3>{key}:</h3>
                          <p>overeenkomst: ja/nee</p>
                        </div>
                      </Accordion.Title>
                      <Accordion.Content style={{ backgroundColor: "white" }}>
                        <div style={{ display: "flex" }}>
                          <div>
                            <h3>Product from WoC</h3>
                            <br></br>
                            <h6>Text:</h6>
                            <br></br>
                            <p>{value}</p>
                          </div>
                          <div>
                            <h3>Product from retailer</h3>
                            <br></br>
                            <h6>Text:</h6>
                            <br></br>
                            <p>{product.product_scraped[key]}</p>
                          </div>
                        </div>
                      </Accordion.Content>
                    </Accordion.Panel>
                  );
                })}
              </Accordion>
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
