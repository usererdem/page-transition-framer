import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";
import Link from "next/link";
import { GetServerSideProps } from "next";

// Define Product type
interface Product {
  id: string;
  name: string;
  details: string;
  price: string;
  image: string;
}

// Define Props type
interface Props {
  product: Product;
}

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

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

const ProductPage: React.FC<Props> = (props) => (
  <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
    <div className='h-screen'>
      <div className='h-screen flex items-center justify-between'>
        <motion.div
          className='h-screen w-1/2 bg-amber-700 flex justify-center items-center'
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}>
          <motion.img
            className='rounded-md'
            key={props.product.image}
            src={props.product.image}
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: 200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          />
        </motion.div>
        <div className='w-1/2 flex flex-col items-center justify-center mx-3'>
          <motion.div variants={stagger} className='flex flex-col gap-4'>
            <Link href='/'>
              <motion.div variants={fadeInUp}>
                <a className='text-lg transition-all py-2 rounded-md hover:bg-blue-600 hover:text-white hover:px-2 '>
                  Back to products
                </a>
              </motion.div>
            </Link>
            <motion.div className='mt-10' variants={fadeInUp}>
              <span className='font-semibold'>Hamur isi</span>
            </motion.div>
            <motion.h1 className='font-bold text-2xl' variants={fadeInUp}>
              {props.product.name}
            </motion.h1>
            <motion.p variants={fadeInUp}>{props.product.details}</motion.p>
            <motion.div variants={fadeInUp} className='flex gap-3 mb-6'>
              <span className='bg-green-600 text-white px-1 py-1 rounded-lg'>
                Soyasız
              </span>
              <span className='bg-green-600 text-white px-1 py-1 rounded-lg'>
                Glutensiz
              </span>
            </motion.div>
            <motion.div variants={fadeInUp} className='flex justify-between'>
              <div className='flex gap-3 items-center mb-8'>
                <div className='bg-gray-300 cursor-pointer text-2xl rounded-full w-8 h-8 flex justify-center items-center pb-2'>
                  -
                </div>
                <div className='amount'>1</div>
                <div className='bg-white border border-black cursor-pointer text-2xl rounded-full w-8 h-8 flex justify-center items-center pb-2'>
                  +
                </div>
              </div>
              <span className='font-bold text-2xl'>{props.product.price}</span>
            </motion.div>
            <motion.div variants={fadeInUp} className='flex gap-4'>
              <button className='bg-blue-500 text-white px-7 py-2 rounded-lg uppercase'>
                Add to cart
              </button>
              <button className='uppercase bg-white px-7 py-2 rounded-lg'>
                Subscribe
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(
    `https://my-json-server.typicode.com/usererdem/dummy-data/products/${id}`
  );
  const product: Product = await res.json();
  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
