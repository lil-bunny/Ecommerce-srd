import React from 'react';
import './ProductList.scss';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SideNavigation from '../../components/Navigation/NavigationItems/SideNavigation';
import Product from './Product/Product';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
// import ScrollToTopOnMount from '../../shared/ScrollToTopOnMount';
import {
  SHOW_DETAILS,
  OPEN_MODAL,
  CLOSE_MODAL,
  HANDLE_DIRECTION,
  HANDLE_CHECKBOX_VALUE,
  SORT_PRODUCTS
} from './../../store/actions/actionTypes';

function ProductList(props) {
  // const [checkboxvalue, setChechboxValue] = useState("relevance")
  const products = useSelector(state => state.products.products)
  const modalShowed = useSelector(state => state.interface.modalShowed)
  const modalProduct = useSelector(state => state.interface.modalProduct)
  const checkboxValue = useSelector(state => state.products.sortCheckboxValue)
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch({ type: HANDLE_CHECKBOX_VALUE })
    dispatch({ type: HANDLE_DIRECTION })
    dispatch({ type: SORT_PRODUCTS })
  };

  const showDetailsByModal =()=> {
    dispatch({ type: SHOW_DETAILS })
    dispatch({ type: CLOSE_MODAL })
  }
  if (!products || products.length === 0) {
    return <Redirect to="/" />
  };

  const { title, img, subtitle, price, id } = modalProduct;
  console.log("products", products)
  return (
    <>
      {/* <ScrollToTopOnMount /> */}
      <div className="product-container">
        <Modal
          showModal={modalShowed}
          showBackdrop={modalShowed}
          closeModal={() => dispatch({ type: CLOSE_MODAL })}>
          <button onClick={() => dispatch({ type: CLOSE_MODAL })} className="close-modal-btn">x</button>
          <h3 className="main-title">{title}</h3>
          <img src={img} alt="" />
          <h3 className="modal-title">Info:</h3>
          <p className="modal-subtitle">{subtitle}</p>
          <h3 className="modal-title">Price: {price}.00 $</h3>
          <h3 className="modal-title">Sizes: S, M, L, XL, XXL</h3>
          <div className="btn-wrapper">
            <Link to={`/details/${id}`}>
              <Button clicked={() => showDetailsByModal(id)}>Show Details</Button>
            </Link>
          </div>
        </Modal>
        <div className="filter-panel">
          Sort by:
          <select onChange={handleChange} value={checkboxValue}>
            <option value="relevance">Relevance</option>
            <option value="price - low to high">Price - low to high</option>
            <option value="price - high to low">Price - high to low</option>
          </select>
          <p className="products-amount">Products amount: <span className="amount">{products.length}</span></p>
        </div>
        <div className="product-list-wrapper">
          <div className="navigation">
            <SideNavigation />
          </div>
          <ul className="product-list">
            {products.map(product => (
              <Product
                key={product.id}
                product={product}
                showModal={() => dispatch({ type: OPEN_MODAL })}
                showDetails={() => dispatch({ type: SHOW_DETAILS })}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );

};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  modalShowed: PropTypes.bool.isRequired,
  modalProduct: PropTypes.object,
  checkboxValue: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  sortProducts: PropTypes.func.isRequired,
  handleDirection: PropTypes.func.isRequired,
  handleCheckboxValue: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
};





export default ProductList;