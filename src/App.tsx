// import React, { useEffect, useState } from 'react'

// import MainLayout from './layout/MainLayout'
// import CardCategorias from './components/CardCategorias'
// import PizzaMenu from './components/PizzaMenu'
// import CarouselLayout from './layout/CarouselLayout'
// import LocalesMenu from './components/LocalesMenu'
// import AnimationMoto from './components/AnimationMoto'
// import MenuList from './components/MenuList'
// import Cart from './components/Cart'
// import { CartProvider } from './context/CartContext'

// const App: React.FC = () => {
//   const [showAnimation, setShowAnimation] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowAnimation(false);
//     }, 4000); // 4 segundos

//     return () => clearTimeout(timer); // limpiar el timer si el componente se desmonta
//   }, []);
//   return (
//     <>
//       <MainLayout >

//         {showAnimation && <AnimationMoto />}


//         <CarouselLayout />


//         <section className='w-[85%] mx-auto pb-20 px-10 my-20 flex justify-center gap-10'>


//           <div className='w-full'>
//             <div>

//             </div>
//             {/* <PizzaMenu /> */}
//             <LocalesMenu />

//           </div>
//         </section>

//         <CartProvider>
//           <div className="relative  bg-gray-100">
//             <MenuList />

//           </div>
//         </CartProvider>
//       </MainLayout>
//     </>
//   )
// }

// export default App