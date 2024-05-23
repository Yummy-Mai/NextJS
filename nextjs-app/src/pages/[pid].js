import path from 'path'
import fs from 'fs/promises'

export default function DetailProduct(props){
    const { loadedProduct } = props
    if(!loadedProduct){
        return <p>loading...</p>
    }
    return(
        <>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </>
    )
}

async function getData(){
    let filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
    let jsonData = await fs.readFile(filePath)
    return JSON.parse(jsonData)
}
export async function getStaticProps(context) {
    const { params } = context
    const produceId = params.pid
    const data = await getData()
    const product = data.products.find(product => product.id === produceId)
    if(!product){
        return { notFound: true }
    }
    return {
        props: {
            loadedProduct: product
        },
    }
}

// 告诉nextJS哪些动态实例需要预先渲染成此动态页面，data中有三条数据，因此预渲染三条
export async function getStaticPaths(){
    const data = await getData()
    const ids = data.products.map(product => product.id)
    const params = ids.map(id => ({params: {pid: id}}))
    return {
        // paths: [
        //     { params: {pid: "p1"}},
        //     // { params: {pid: "p2"}},
        //     // { params: {pid: "p3"}}
        // ],
        paths: params,
        // 设置为true表示告诉nextJS上面没有列出的params会在访问时被加载，而不是预加载
        fallback: true
    }
}