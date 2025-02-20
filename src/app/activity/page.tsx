import React from 'react'

const data = [
    {
        "name": "Sarah Thompson",
        "location": "New York, USA",
        "rating": 5,
        "review": "This product exceeded my expectations! The quality is amazing, and the customer service was outstanding. I highly recommend it to everyone."
    },
    {
        "name": "John Lee",
        "location": "London, UK",
        "rating": 4,
        "review": "Overall, a great experience. The product works well, but the shipping took a little longer than expected. Still, very happy with my purchase."
    },
    {
        "name": "Maria Gonzalez",
        "location": "Barcelona, Spain",
        "rating": 5,
        "review": "Absolutely love it! The attention to detail is incredible, and it’s exactly what I was looking for. Will definitely buy again in the future!"
    }
]


const Activity = () => {
    return (
        <div className="w-full grid grid-cols-5 gap-5">
            {data?.map((item, index) => (
                <div
                    key={index}
                    className="w-full border-[1px] border-primary rounded-xl p-2 grid grid-rows-[120px_auto_1fr_auto] h-full"
                >
                    <div className="w-full h-full rounded-xl bg-primary"></div>
                    <h1 className="font-semibold leading-tight text-white line-clamp-2 my-1">
                        {item?.name}
                    </h1>
                    <p className="w-full leading-tight text-[12px] text-gray-400 line-clamp-5">
                        {item?.review}
                    </p>
                    <button className="w-fit mt-4 px-4 py-1.5 rounded-md bg-primary text-indigo-400 font-medium text-sm">
                        Read
                    </button>
                </div>
            ))}
        </div>

    )
}

export default Activity