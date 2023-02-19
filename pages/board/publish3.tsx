const fetchImage = async (formData: FormData) => {
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  return response;
};

const TextPost = () => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const result = await fetchImage(formData);
    const json = await result.json();
    console.log(json.imageUrl);
  };
  return (
    <div>
      <h1>TextPost</h1>
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default TextPost;
