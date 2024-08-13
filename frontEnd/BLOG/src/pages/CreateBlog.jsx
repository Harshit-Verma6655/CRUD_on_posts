
import { Textarea, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function TextareaVariants() {
    const [content, setContent] = useState();
    const [title, setTitle] = useState();
    const query = useParams();
    console.log("query", query);
    const [id, setId] = useState();
    useEffect(() => {
        setId(() => {
            if (!query.id) {
                return null;
            }
            return query?.id;
        })
        if (query?.id) {
            fetch(`http://localhost:8080/api/posts/${id}`, {
                method: 'GET',
                headers: {
                    "content-type": 'application/json'
                },
                credentials: 'include',

            }).then(async (res) => {
                const data = await res.json();
                console.log(data, "fetched");


                setTitle(data.title);
                setContent(data.content);
            })
        }


    }, [id])
    const handleClick = () => {
        console.log(title, content);
        if (!id) {
            fetch('http://localhost:8080/api/posts', {
                method: 'POST',
                headers: {
                    "content-type": 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    title,
                    content
                })
            }).then(async (res) => {
                const data = await res.json();
                console.log(data, "created");
                if (res.status == 201)
                    toast.success(data.msg);

                setTitle("");
                setContent("");
            })
        } else {





            fetch(`http://localhost:8080/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    "content-type": 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    title,
                    content
                })
            }).then(async (res) => {
                const data = await res.json();
                console.log(data, "created");
                if (res.status == 201)
                    toast.success(data.msg);

                setTitle("");
                setContent("");
            })
        }

    }
    return (

        <div className="flex  flex-col items-center h-[100vh]  ">
            <ToastContainer />
            <video
                autoPlay
                loop
                muted
                className="absolute -z-10 w-auto min-w-full min-h-full max-w-none"
            >
                <source
                    src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <div className="text-2xl w-full sticky top-0 text-center p-4 mb-5 bg-black text-white font-black"><Link to={"/"}

                className="float-start">Blogs</Link>Post Blog</div>
            <div className="flex w-96 flex-col gap-6  p-6 border-4 border-red-600 bg-white ">
                <p className="text-lg font-bold">BLOG</p>
                <Textarea variant="static" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Textarea variant="Content" onChange={(e) => setContent(e.target.value)} value={content} label="Content" />
                {/* <Textarea variant="outlined" label="Outlined" /> */}
                <Button
                    size="lg"
                    variant="gradient"
                    color="light-blue"
                    className="group relative flex items-center gap-3 overflow-hidden pr-[72px]"
                    onClick={handleClick}
                >
                    {id == null ? "Post Blog" : "Update"}
                    <span className="absolute right-0 grid h-full w-12 place-items-center bg-light-blue-600 transition-colors group-hover:bg-light-blue-700">
                        <img src="https://docs.material-tailwind.com/icons/twitter.svg" alt="metamask" className="h-6 w-6" />
                    </span>
                </Button>
            </div>
        </div>
    );
}
export default TextareaVariants;