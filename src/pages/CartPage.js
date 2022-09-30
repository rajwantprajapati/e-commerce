import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Breadcrumb, CartContent } from '../components';

const CartPage = () => {
  const { cart } = useCartContext();

  if (!cart.length) {
    return <Wrapper className='page-100'>
      <div className="empty">
        <h2>Cart is Empty.</h2>
        <Link to='/products' className='btn'>Fill It</Link>
      </div>
    </Wrapper>
  }

  return (
    <main>
     <Breadcrumb title='cart' />
     <Wrapper>
      <CartContent />
     </Wrapper>
    </main>
  )
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage