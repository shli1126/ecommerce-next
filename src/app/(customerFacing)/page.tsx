import { Button } from "@/src/components/ui/button"
import { ProductCard } from "@/src/components/ui/ProductCard"
import db from "@/src/db/db"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"


function getMostPopularProducts() {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6
    })
}


function getNewestProducts() {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        take: 6
    })
}



export default function HomePage() {
    return <main className="space-y-12">
        <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProducts} />
        <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />

    </main>
}

type ProductGridSectionProps = {
    title: string,
    productsFetcher: () => Promise<Product[]>
}

async function ProductGridSection({ productsFetcher, title }: ProductGridSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex gap-4" >
                <h2 className="text-3xl font-bold">
                    {title}
                </h2>
                <Button variant="outline" asChild>
                    <Link href="/products">
                        <span>
                            View All
                        </span>
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
            </div >

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(await productsFetcher()).map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

        </div >
    )
}