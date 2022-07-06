import products from '../products.json';
import React from 'react';

type ProductCategoryRowProps = {
    category: string,
}

class ProductCategoryRow extends React.Component<ProductCategoryRowProps> { 
    render() {
        const category = this.props.category;
        return(
            <div className='category'>
                {category}
            </div>
        );
    }
}

interface Product {
    'category': string,
    'price': string,
    'stocked': boolean,
    'name': string,
}

type ProductRowProps = {
    product: Product
}

class ProductRow extends React.Component<ProductRowProps> {
    render() {
        const product = this.props.product;
        const name = product.stocked ? 
            product.name :
            <span style={{color: 'red'}}>
                {product.name}
            </span>;

        return(
            <div className='product'>
                <p>{name}</p>
                <p>{product.price}</p>
            </div>
        );
    }
}

type ProductTableProps = {
    filterText: string,
    inStockOnly: boolean,
    products: Product[],
}

class ProductTable extends React.Component<ProductTableProps> {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows: JSX.Element[] = [];
        let lastCategory: string|null = null;

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
            );
            lastCategory = product.category;
        });

        return(
            <div className='products'>
                <div className='head'>
                    <p>Name</p>
                    <p>Price</p>
                </div>
                <div>{rows}</div>
            </div>
        );
    }
}

type SearchBarProps = {
    onFilterTextChange: (filterText: string) => void,
    onInStockChange: (inStockOnly: boolean) => void,
    filterText: string,
    inStockOnly: boolean,
}

class SearchBar extends React.Component<SearchBarProps> {
    constructor(props:SearchBarProps) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onFilterTextChange(event.target.value);
    }

    handleInStockChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onInStockChange(event.target.checked);
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
        );
    }
}

type FiltrableProductTableStates = {
    filterText: string,
    inStockOnly: false,
}

interface MyProps {[n: string]: never}

class FiltrableProductTable extends React.Component {
    constructor(props:MyProps) {
        super(props);

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }
    state:FiltrableProductTableStates = {
        filterText: '',
        inStockOnly: false,
    };
    

    handleFilterTextChange(filterText:string) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly:boolean) {
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
        );
    }
}

export default FiltrableProductTable;