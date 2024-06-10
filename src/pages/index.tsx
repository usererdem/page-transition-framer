import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";

interface Product {
  id: string;
  name: string;
  details: string;
  price: string;
  image: string;
}

interface Props {
  products: Product[];
}

// Our custom easing
let easing = [0.6, -0.05, 0.01, 0.99];

// animate: defines animation
// initial: defines initial state of animation or stating point.
// exit: defines animation when component exits

// Custom variant
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Index: React.FC<Props> = ({ products }) => (
  <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
    <div className='w-screen flex flex-col items-center justify-center mx-auto'>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className='flex justify-center text-2xl mx-2'>
        <h1>Select a dessert</h1>
      </motion.div>
      <motion.div
        variants={stagger}
        className='flex justify-center items-center w-full py-20'>
        {products.map((product) => (
          <Link
            key={product.id}
            href='/products/[id]'
            as={`/products/${product.id}`}>
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='box-border relative rounded-xl p-6 cursor-pointer bg-white w-96 m-6 flex flex-col items-center'>
              <span className='text-md text-center w-full mb-8 block'>
                Kruvasan
              </span>
              <motion.img
                className='rounded-md mb-3'
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                key={product.image}
                src={product.image}
                width={250}
              />
              <div className='text-xl'>
                <h4>{product.name}</h4>
                <span>{product.price}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://my-json-server.typicode.com/usererdem/dummy-data/products"
  );
  const products: Product[] = await res.json();
  return {
    props: {
      products,
    },
  };
};

export default Index;
