import {createApi, fetchBaseQuery}from "@reduxjs/toolkit/query/react";
// const baseUrl = import.meta.env.VITE_API_PRODUCTS;


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000"
  }),
  tagTypes: ['Products'],
  endpoints: (builder)=>({
    getProducts: builder.query({
      query: ()=> '/products',
      providesTags: ["Products"]
    }),
    createProduct: builder.mutation({
      query: (newProduct)=>({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"]
    }),
    updateProduct: builder.mutation({
      query: (updatedProduct)=> ({
        url: `/products/${updatedProduct.id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Products"]
    })
    ,
    deleteProduct: builder.mutation({
      query: (id)=>({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"]
    })
  })  
});

export const {useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation} = apiSlice