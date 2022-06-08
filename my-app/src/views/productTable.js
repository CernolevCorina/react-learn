import products from '../products.json';
import React from 'react';

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return(
            <div className='category'>
                {category}
            </div>
        )
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ? 
            product.name :
            <span style={{color: 'red'}}>
                {product.name}
            </span>

        return(
            <div className='product'>
                <p>{name}</p>
                <p>{product.price}</p>
            </div>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach(product => {
            if(product.name.indexOf(filterText) === -1) {
                return;
            }

            if (inStockOnly && !product.stocked) {
                return;
            }

            if(product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}
                    />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}
                />
            )
            lastCategory = product.category;
        })

        return(
            <div className='products'>
                <div className='head'>
                    <p>Name</p>
                    <p>Price</p>
                </div>
                <div>{rows}</div>
            </div>
        )
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(event) {
        this.props.onFilterTextChange(event.target.value)
    }

    handleInStockChange(event) {
        this.props.onInStockChange(event.target.checked)
    }

    render(){
        return (
            <form>
                <input 
                    type='text'
                    placeholder='Search...'
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input 
                        type='checkbox'
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockChange}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        )
    }
}

class FiltrableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        });
    }
    render() {
        return(
            <div id='productTable'>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                />
                <ProductTable 
                products={products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                />
            </div>
        )
    }
}

export default FiltrableProductTable;