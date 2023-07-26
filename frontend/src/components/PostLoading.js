import React from "react";
import { Space, Spin } from 'antd';

function PostLoadingComponent(PostComponent){
    return (
        function PostLoading({isLoading, ...props}){
            console.log(props)
            if(!isLoading){
                return(
                    <PostComponent {...props}/>
                )
            }
            else{
                return (
                    <Space direction="vertical" style={{width: '100%'}}>
                        <Spin tip="Loading" size="large">
                            <div className="content"/>
                        </Spin>
                    </Space>
                )
            }
        }
    )
}

export default PostLoadingComponent;