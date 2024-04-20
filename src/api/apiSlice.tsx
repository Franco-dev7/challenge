import {createApi, fetchBaseQuery}from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com'
  }),
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
    deleteProduct: builder.mutation({
      query: (id)=>({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    })
  })  
});

export const {useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation} = apiSlice