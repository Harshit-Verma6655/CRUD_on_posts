import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import Nav from './Nav';
import CarouselWithContent from './CarouselWithContent';
import BlogCard from './BlogCard';
import { DrawerDefault } from './DrawerDefault';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token')
        if (!token) {
            navigate('/login');
        }



    }, [])

    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/api/posts/').then(async (res) => {
            const blogs = await res.json();
            setData(blogs.allPosts);
            console.log(blogs);
        })
    }, [])
    const handleDelete = (id) => {
        console.log(id);
        fetch(`http://localhost:8080/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                "content-type": 'application/json'
            },
            credentials: 'include',

        }).then(async (res) => {
            const data = await res.json();
            console.log(data, "deletd");

            toast.success(data.msg);
            setTimeout(() => {
                window.location.reload();
            }, 2000)

        })
    }


    return (<>
        <div className='  '>
            <ToastContainer />
            <Nav />

            <CarouselWithContent />
            <div className='flex justify-center flex-col gap-10 items-center bg-black mt-0 align-middle'>
                {data?.map((item, index) =>
                    <BlogCard key={index} title={item.title} content={item.content} createdAt={item.createdAt} createdBy={item.createdBy} id={item._id} handleDelete={handleDelete} />
                )}

            </div>
        </div >





    </>

    )
}

export default Home