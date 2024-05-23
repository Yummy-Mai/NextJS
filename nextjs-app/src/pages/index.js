
import path from 'path'
import fs from 'fs/promises'
import Link from "next/link";
export default function Home(props) {
    const { products } = props
    return (
        <ul>
            {products.map(product =>
                <li key={product.id}>
                    <Link href={`/${product.id}`}>{product.title}</Link>
                </li>
            )}
        </ul>
    );
}

// 运行在服务端的代码
export async function getStaticProps() {
    let filePath = path.resolve(__dirname,'../../../data/dummy-data.json')
    let jsonData = await fs.readFile(filePath)
    let data = JSON.parse(jsonData)
    // fs.readFile(filePath,(err,data) => {
    //     jsonData = JSON.parse(data)
    //     // console.log(jsonData)
    // })

    // 当没有获取到数据时，展示404
    if(data.products.length === 0){
        // 当前页面是否为404页面
        return { notFound: true }
    }
    return {
        props: {
            products: data.products
        },
        // 对于每个请求都会重新生成页面，除非距离最后一次生成不足10s，生产过程中生效，开发过程中每次都会重新生成
        revalidate: 10,
        // 当前页面是否为404页面
        // notFound: true
    }
}


