import React, { useEffect, useState } from 'react';
import './main.css'
import Posts from './components/Posts'
import axios from 'axios';
import PostLoadingComponent from './components/PostLoading'

function Main(){
    const baseUrl = "http://localhost:8000/blog_api/"
    const PostLoading = PostLoadingComponent(Posts)
    const [appState, setAppState] = useState({
        loading:false,
        posts:null,
    })
    useEffect(()=>{
        setAppState({loading:true})
        axios.get(baseUrl)
        .then(posts => {
            setAppState({loading:false, posts:posts})
        })
    }, [setAppState])

    return(
        <div className='Main'>
            <h3 style={{ textAlign:"center"}}>Announcements</h3>
            <PostLoading isLoading={appState.loading} posts={appState.posts}/>
        </div>
    )
}

export default Main