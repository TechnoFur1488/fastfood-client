import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { string } from "zod";

interface Auth {
    email: string
    name: string
    password: string
}

interface Product {
    id: number
    img: string
    name: string
    description: string
    price: number
    catalogId: number
    totalBuy: number
    discount: number
}

interface Catalog {
    id: number
    name: string
}

interface Order {
    adres: string
    phone: string
}

interface Cart {
    id: number
    quantity: number
    name: string
    price: number
    img: string
    discount: number
    productId: number
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fastfood-server-production.up.railway.app/",
        credentials: "include"
    }),
    tagTypes: ["Product", "Catalog", "Cart", "User", "Order"],
    endpoints: (builder) => ({
        signinUser: builder.mutation<{ signinUser: { role: string } }, Partial<Auth>>({
            query: (user) => ({
                url: "/api/user/signin",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        signupUser: builder.mutation<void, Auth>({
            query: (user) => ({
                url: "/api/user/signup",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["User"]
        }),
        getRole: builder.query<{role: string}, void>({
            query: () => "/api/user/role",
            providesTags: ["User"]
        }),

        updateProduct: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: `/api/product/${formData.get("id")}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ["Product"]
        }),
        createProduct: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: "/api/product",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["Product"]
        }),
        getProductsPopular: builder.query<{ product: { rows: Product[] } }, void>({
            query: () => "/api/product/popular",
            providesTags: ["Product"]
        }),
        getNewPopular: builder.query<{ product: { rows: Product[] } }, void>({
            query: () => "/api/product/new",
            providesTags: ["Product"]
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Product"]
        }),

        createCatalog: builder.mutation<void, Partial<Catalog>>({
            query: (body) => ({
                url: "/api/catalog",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Catalog"]
        }),
        updateCatalog: builder.mutation<void, Catalog>({
            query: (body) => ({
                url: `/api/catalog/${body.id}`,
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["Catalog"]
        }),
        getCatalog: builder.query<{ catalog: Catalog[] }, void>({
            query: () => "/api/catalog",
            providesTags: ["Catalog"]
        }),
        getOneCatalog: builder.query<{ catalog: Catalog }, number>({
            query: (id) => `/api/catalog/${id}`,
            providesTags: ["Catalog"]
        }),
        getProductsCatalog: builder.query<{ product: { count: number, rows: Product[] } }, { id: number, page: number }>({
            query: ({ id, page }) => `/api/catalog/products/${id}?page=${page}`,
            providesTags: ["Product"]
        }),
        deleteCatalog: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/catalog/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Catalog"]
        }),

        addCart: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/cart/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["Cart"]
        }),
        getCart: builder.query<{ cartItem: Cart[] }, void>({
            query: () => "/api/cart",
            providesTags: ["Cart"]
        }),
        updateCart: builder.mutation<void, { id: number, quantity: number }>({
            query: ({ id, quantity }) => ({
                url: `/api/cart/${id}`,
                method: "PUT",
                body: { quantity }
            }),
            invalidatesTags: ["Cart"]
        }),
        deleteCart: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/cart/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Cart"]
        }),

        postOrder: builder.mutation<void, Order>({
            query: (order) => ({
                url: "/api/order",
                method: "POST",
                body: order
            }),
            invalidatesTags: ["Order"]
        })
    })
})

export const {
    useSigninUserMutation,
    useSignupUserMutation,
    useGetRoleQuery,

    useCreateProductMutation,
    useGetProductsPopularQuery,
    useGetNewPopularQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,

    useCreateCatalogMutation,
    useUpdateCatalogMutation,
    useGetCatalogQuery,
    useGetOneCatalogQuery,
    useGetProductsCatalogQuery,
    useDeleteCatalogMutation,

    useAddCartMutation,
    useGetCartQuery,
    useUpdateCartMutation,
    useDeleteCartMutation,

    usePostOrderMutation,
} = apiSlice