import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { getAllProducts } from '../../features/products/productsSlice'
import { useEffect, useRef, useState } from "react"
import { addProductToCart } from '../../features/orders/ordersSlice'
import * as statuses from '../../features/statuses'
import ProductCard from "./productComponents/productCard"
import ProductsGrid from "./productComponents/productsGrid"
import { Button, Icon } from 'semantic-ui-react'
import FilterPanel from "./productComponents/filterPanel"

export default function AllProdeucts() {
    const dispatchFunc = useDispatch()
    const products = useSelector(store => store.products)
    const arrProducts = useSelector(store => store.products.arrProducts)
    const currentLoggedUser = useSelector(store => store.users.currentLoggedUser)
    const scrollDemoRef = useRef(null);
    const [filterParameters, setFilterParameters] = useState({ name: '', values: [0, 200] })
    const [filteredProducts, setFilteredProducts] = useState(arrProducts)
    const [showFiltered, setShowFiltered] = useState(false)
    const [atTop, setAtTop] = useState(true)
    const navigateFunc = useNavigate()
    useEffect(() => {
        invokeGetAll()
    })

    // Save scroll position when navigating away from Page1
    const handleNavigation = () => {
        if (scrollDemoRef.current) {
            const scrollPositionProducts = scrollDemoRef.current.scrollTop;
            sessionStorage.setItem('scrollPositionProducts', scrollPositionProducts);
        }
    };



    // Restore scroll position on component mount
    useEffect(() => {
        const scrollPositionProducts = sessionStorage.getItem('scrollPositionProducts');
        if (scrollDemoRef.current && scrollPositionProducts) {
            // console.log(scrollPositionProducts)
            scrollDemoRef.current.scrollTo(0, parseInt(scrollPositionProducts, 10));

        }
    }, []);

    const invokeGetAll = () => {

        //TODO chack teacher version, also use local/session storage
        if (products.getAllStatus != statuses.fulfilled) {
            console.log("get all products🎁")
            dispatchFunc(getAllProducts())
        }

    }
    const pressAdd = (item) => {
        dispatchFunc(addProductToCart(item))
    }

    const pressUpdateExisting = (id) => {
        handleNavigation()
        navigateFunc('/product/' + id)
    }

    const pressDisplayProduct = (id) => {
        handleNavigation()
        navigateFunc('/productDisplay/' + id)
    }
    const filterProducts = (products) => {
        if (filterParameters.name) {
            products = products.filter(product => {
                // Check if the product name equals the search string (case insensitive)
                return product.name.toLowerCase().includes(filterParameters.name.toLowerCase());
            });
        }

        products = products.filter(product => {
            // Check if the product price is between low and high (inclusive)
            return product.price >= filterParameters.values[0] && product.price <= filterParameters.values[1];
        });

        return products
    }


    const handleFilter = () => {
        setFilteredProducts(filterProducts(arrProducts))
        setShowFiltered(true)
    }
    const handleUnfilter = () => {
        setFilterParameters({ name: '', values: [0, 200] })
        setShowFiltered(false)
        setFilteredProducts(arrProducts)
    }
    const beEnabled = () => {//fix
        const result = filterParameters.name || (filterParameters.highPrice != -1 && filterParameters.lowPrice != -1)
        return result
    }
    const isShowFiltered = () => {
        return showFiltered && filteredProducts.length > 0
    }
    const pressBackToTop = () => {
        scrollDemoRef.current.scrollTo(0, parseInt(0, 10));
    }
    const scroll = (e) => {
        setAtTop(e.target.scrollTop == 0)
    }
    return (<div className="divPink overflow" ref={scrollDemoRef} onScroll={scroll}>
        <div className={!atTop ? 'visible' : 'hidden'}
            style={{

                position: "fixed",
                top: "96px",
                zIndex: "2",
                left: "30px",
            }}
        >
            <Button icon circular onClick={pressBackToTop} inverted color="violet">
                <Icon name='arrow alternate circle up' size='big' />
            </Button>

        </div>

        <FilterPanel   arrProducts={arrProducts} setFilterParameters={setFilterParameters} filterParameters={filterParameters} showFiltered={showFiltered} beEnabled={beEnabled} handleFilter={handleFilter} handleUnfilter={handleUnfilter} filteredProducts={filteredProducts}></FilterPanel>

        {
            showFiltered && filteredProducts &&
            <ProductsGrid pressDisplayProduct={pressDisplayProduct} products={filteredProducts} press={currentLoggedUser == statuses.manager ? pressUpdateExisting : pressAdd} manager={currentLoggedUser == statuses.manager}></ProductsGrid>
        }

        {
            arrProducts && !showFiltered &&
            <ProductsGrid pressDisplayProduct={pressDisplayProduct} products={arrProducts} press={currentLoggedUser == statuses.manager ? pressUpdateExisting : pressAdd} manager={currentLoggedUser == statuses.manager}></ProductsGrid>
        }

    </div >)
}