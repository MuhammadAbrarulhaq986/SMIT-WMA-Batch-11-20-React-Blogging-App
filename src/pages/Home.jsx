import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Avatar,
} from "@mui/material";

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
    authorImage: "https ://picsum.photos/200/111",
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
    <Box sx={{ padding: 4, margin: 2 }}>
      <Typography
        variant="h2"
        sx={{
          marginBottom: 2,
          fontSize: 50,
          fontWeight: 700,
          fontFamily: "Montserrat",
          textShadow: "2px 2px 4px rgba(170, 50, 220, 0.8)",
          color: "#333",
          textAlign: "center",
        }}
      >
        Latest Blogs
      </Typography>
      <Grid container spacing={4}>
        {/*  Increased spacing to 4 */}
        {blogs.map((blog, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                boxShadow: "0px 0px 10px rgba(170, 50, 220, 0.5)",
                borderRadius: 10,
                padding: 4, // Added padding to increase the size of the card
                minHeight: 400, // Set a minimum height for the card
              }}
            >
              <CardMedia
                component="img"
                height="200" // Increased the height of the image
                image={blog.image}
                alt={blog.title}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontSize: 20,
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                    textShadow: "1px 1px 2px rgba(170, 50, 220, 0.5)",
                    color: "#333",
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: 16,
                    fontWeight: 400,
                    fontFamily: "Open Sans",
                    color: "#666",
                  }}
                >
                  {blog.description}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={blog.authorImage}
                    sx={{ width: 30, height: 30, marginRight: 1 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      fontFamily: "Open Sans",
                      color: "#666",
                    }}
                  >
                    By {blog.author} on {blog.date}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
