import React from "react";

const blogs = [
  {
    title: "Blog 1",
    description:
      "This is a sample blog post. You can add your own content here.",
    author: "John Doe",
    date: "2024-01-01",
    image: "https://picsum.photos/200/300",
    authorImage: "https://picsum.photos/200/100",
  },
  {
    title: "Blog 2",
    description:
      "This is another sample blog post. You can add your own content here.",
    author: "Jane Doe",
    date: "2024-01-15",
    image: "https://picsum.photos/200/301",
    authorImage: "https://picsum.photos/200/101",
  },
  {
    title: "Blog 3",
    description:
      "This is a third sample blog post. You can add your own content here.",
    author: "Bob Smith",
    date: "2024-02-01",
    image: "https://picsum.photos/200/302",
    authorImage: "https://picsum.photos/200/102",
  },
  {
    title: "Blog 4",
    description:
      "This is a fourth sample blog post. You can add your own content here.",
    author: "Alice Johnson",
    date: "2024-03-01",
    image: "https://picsum.photos/200/303",
    authorImage: "https://picsum.photos/200/103",
  },
  {
    title: "Blog 5",
    description:
      "This is a fifth sample blog post. You can add your own content here.",
    author: "Mike Brown",
    date: "2024-04-01",
    image: "https://picsum.photos/200/304",
    authorImage: "https://picsum.photos/200/104",
  },
  {
    title: "Blog 6",
    description:
      "This is a sixth sample blog post. You can add your own content here.",
    author: "Emily Davis",
    date: "2024-05-01",
    image: "https://picsum.photos/200/305",
    authorImage: "https://picsum.photos/200/105",
  },
  {
    title: "Blog 7",
    description:
      "This is a seventh sample blog post. You can add your own content here.",
    author: "John Doe",
    date: "2024-06-01",
    image: "https://picsum.photos/200/306",
    authorImage: "https://picsum.photos/200/106",
  },
  {
    title: "Blog 8",
    description:
      "This is an eighth sample blog post. You can add your own content here.",
    author: "Jane Doe",
    date: "2024-07-01",
    image: "https://picsum.photos/200/307",
    authorImage: "https://picsum.photos/200/107",
  },
  {
    title: "Blog 9",
    description:
      "This is a ninth sample blog post. You can add your own content here.",
    author: "Bob Smith",
    date: "2024-08-01",
    image: "https://picsum.photos/200/308",
    authorImage: "https://picsum.photos/200/108",
  },
  {
    title: "Blog 10",
    description:
      "This is a tenth sample blog post. You can add your own content here.",
    author: "Alice Johnson",
    date: "2024-09-01",
    image: "https://picsum.photos/200/309",
    authorImage: "https://picsum.photos/200/109",
  },
  {
    title: "Blog 11",
    description:
      "This is an eleventh sample blog post. You can add your own content here.",
    author: "Mike Brown",
    date: "2024-10-01",
    image: "https://picsum.photos/200/310",
    authorImage: "https://picsum.photos/200/110",
  },
  {
    title: "Blog 12",
    description:
      "This is a twelfth sample blog post. You can add your own content here.",
    author: "Emily Davis",
    date: "2024-11-01",
    image: "https://picsum.photos/200/311",
    authorImage: "https://picsum.photos/200/111",
  },
  {
    title: "Blog 13",
    description:
      "This is a thirteenth sample blog post. You can add your own content here.",
    author: "John Doe",
    date: "2024-12-01",
    image: "https://picsum.photos/200/312",
    authorImage: "https://picsum.photos/200/112",
  },
  {
    title: "Blog 14",
    description:
      "This is a fourteenth sample blog post. You can add your own content here.",
    author: "Jane Doe",
    date: "2024-01-01",
    image: "https://picsum.photos/200/313",
    authorImage: "https://picsum.photos/200/113",
  },
  {
    title: "Blog 15",
    description:
      "This is a fifteenth sample blog post. You can add your own content here.",
    author: "Bob Smith",
    date: "2024-02-01",
    image: "https://picsum.photos/200/314",
    authorImage: "https://picsum.photos/200/114",
  },
  {
    title: "Blog 16",
    description:
      "This is a sixteenth sample blog post. You can add your own content here.",
    author: "Alice Johnson",
    date: "2024-03-01",
    image: "https://picsum.photos/200/315",
    authorImage: "https://picsum.photos/200/115",
  },
  {
    title: "Blog 17",
    description:
      "This is a seventeenth sample blog post. You can add your own content here.",
    author: "Mike Brown",
    date: "2024-04-01",
    image: "https://picsum.photos/200/316",
    authorImage: "https://picsum.photos/200/116",
  },
  {
    title: "Blog 18",
    description:
      "This is an eighteenth sample blog post. You can add your own content here.",
    author: "Emily Davis",
    date: "2024-05-01",
    image: "https://picsum.photos/200/317",
    authorImage: "https://picsum.photos/200/117",
  },
  {
    title: "Blog 19",
    description:
      "This is a nineteenth sample blog post. You can add your own content here.",
    author: "John Doe",
    date: "2024-06-01",
    image: "https://picsum.photos/200/318",
    authorImage: "https://picsum.photos/200/118",
  },
  {
    title: "Blog 20",
    description:
      "This is a twentieth sample blog post. You can add your own content here.",
    author: "Jane Doe",
    date: "2024-07-01",
    image: "https://picsum.photos/200/319",
    authorImage: "https://picsum.photos/200/119",
  },
  {
    title: "Blog 21",
    description:
      "This is a twenty-first sample blog post. You can add your own content here.",
    author: "Bob Smith",
    date: "2024-08-01",
    image: "https://picsum.photos/200/320",
    authorImage: "https://picsum.photos/200/120",
  },
  {
    title: "Blog 22",
    description:
      "This is a twenty-second sample blog post. You can add your own content here.",
    author: "Alice Johnson",
    date: "2024-09-01",
    image: "https://picsum.photos/200/321",
    authorImage: "https://picsum.photos/200/121",
  },
  {
    title: "Blog 23",
    description:
      "This is a twenty-third sample blog post. You can add your own content here.",
    author: "Mike Brown",
    date: "2024-10-01",
    image: "https://picsum.photos/200/322",
    authorImage: "https://picsum.photos/200/122",
  },
  {
    title: "Blog 24",
    description:
      "This is a twenty-fourth sample blog post. You can add your own content here.",
    author: "Emily Davis",
    date: "2024-11-01",
    image: "https://picsum.photos/200/323",
    authorImage: "https://picsum.photos/200/123",
  },
];

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-20">
      <h2
        className="text-3xl font-extrabold mb-4 text-center text-white"
        style={{ textShadow: "0px 0px 20px purple" }}
      >
        Latest Blogs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white rounded shadow-md p-4">
            <img
              className="w-full h-64 object-cover mb-4"
              src={blog.image}
              alt={blog.title}
            />
            <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
            <p className="text-black text-sm">{blog.description}</p>
            <div className="flex items-center mt-4">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src={blog.authorImage}
                alt="Author"
              />
              <span className="text-black text-sm">
                By {blog.author} on {blog.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
