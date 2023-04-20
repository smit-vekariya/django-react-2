import React, { Component, useState } from "react";
import { Space, Spin } from 'antd';

function PostLoading(component){
    return ( function PostLoadingComponent({isLoading, ...props}){
        if(!isLoading){
            return(
                <Component {...props}/>
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
    })
}

export default PostLoading;