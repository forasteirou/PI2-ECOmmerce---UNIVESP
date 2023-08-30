/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaCcVisa, FaBarcode, FaCcMastercard, FaCreditCard } from 'react-icons/fa';

export default class Checkout extends Component {
  state = {
    cartItems: [],
    fullName: '',
    cpf: '',
    email: '',
    adress: '',
    cep: '',
    phone: '',
    paymentType: '',
  }

  componentDidMount() {
    this.setState({
      cartItems: JSON.parse(localStorage.getItem('cart')) });
  }

  checkDuplicated = () => {
    const { cartItems } = this.state;

    const itemsToShow = [];

    cartItems.filter((each) => {
      const duplicated = itemsToShow.some((item) => item.id === each.id);

      if (!duplicated) {
        itemsToShow.push(each);
        return true;
      }
      return false;
    });

    return itemsToShow;
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    this.setState({
      [name]: value,
    });
  }

  
    render() {
      const itemsToShow = this.checkDuplicated();
      const { validateFields } = this.state;
      const { getCartItemQuantity, totalPrice } = this.props;
      const MAX_SIZE_TITLE = 50;

      return (
        <div className="checkout-page">
          <div className="checkout-container">
            
          
               
            
            <div
              className="purchase-summary"
            >
              <span className="checkout-title">Resumo da Compra:</span>
              <div>
                { itemsToShow.map((item) => {
                  const { id, price, thumbnail, title } = item;
                  return (
                    <div key={ id } className="cart-product">
                      <img
                        src={ thumbnail }
                        alt={ title }
                        className="img-product"
                      />
                      <div className="qtd-title-product">
                        <span className="title-product">
                          { title.length > MAX_SIZE_TITLE
                            ? `${title.slice(0, MAX_SIZE_TITLE)}...`
                            : title }
                        </span>
                        <span className="qtd-product">
                          { `Quantidade: ${getCartItemQuantity(id)}` }
                        </span>
                      </div>
                      <span className="summary-price">
                        { (price * getCartItemQuantity(id)).toLocaleString('pt-BR',
                          { style: 'currency',
                            currency: 'brl',
                            minimumFractionDigits: 2 }) }
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="phantom-div" />
              <div className="cart-total-checkout">
                <span className="total-text-checkout">
                  Total:
                </span>
                <span className="total-price-checkout">
                  { totalPrice().toLocaleString('pt-BR',
                    { style: 'currency',
                      currency: 'brl',
                      minimumFractionDigits: 2 }) }
                </span>
              </div>
            </div>
            <div className="btn-container">
                  <button
                    type="button"
                    data-testid="checkout-btn"
                    
                    className="chk-btn"
                  >
                    Finalizar compra
                  </button>

            
              </div>
            {/* <Link
            to="/carrinho"
          >
            <p>Voltar para o carrinho</p>
          </Link> */}
          </div>
        </div>
      );
    }
}

Checkout.propTypes = {
  getCartItemQuantity: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  totalPrice: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};
