import React from 'react'
import styled from 'styled-components'
import { Breadcrumb } from '../components'

const CheckoutPage = () => {
  return (
    <main>
      <Breadcrumb title='checkout'/>
      <Wrapper className='page'>
        <h1>Checkout Here</h1>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div``;

export default CheckoutPage