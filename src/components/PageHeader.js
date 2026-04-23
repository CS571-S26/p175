function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h1 style={{ color: "white", fontWeight: "700" }}>
        {title}
      </h1>
      <p style={{ color: "#aaa", marginTop: "-6px" }}>
        {subtitle}
      </p>
    </div>
  );
}

export default PageHeader;