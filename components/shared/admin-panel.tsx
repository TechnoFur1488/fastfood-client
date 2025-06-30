import { CatalogCreate } from "./catalog-create"
import { CreateProduct } from "./create-product"

export const AdminPanel = () => {


    return (
        <div>
            <CreateProduct />
            <CatalogCreate />
        </div>
    )
}