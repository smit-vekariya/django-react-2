import React, {useEffect, useState} from "react";
import PostLoadingComponent from "./components/PostLoading";
import adminPosts from "./components/admin/adminPosts";
import axiosInstance from './axios'
import './App.css'

export default function Admin(){
    const PostLoading = PostLoadingComponent(adminPosts)
    const [appState, setAppState] = useState({
        loading: true,
        posts:null
    })

    useEffect(()=>{
        axiosInstance.get('blog_api/').then((res) =>{
            const allPosts = res.data;
            setAppState({loading:false, posts:allPosts});
        })
    },[setAppState]);

    return(
        <div className="App">
            <h1>Post Management</h1>
            <PostLoading isLoading={appState.loading} adminPosts={appState.posts}/>
        </div>
    )
}