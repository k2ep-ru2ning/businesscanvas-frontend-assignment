const config = {
  storage:
    import.meta.env.VITE_STORAGE === "local-storage"
      ? "local-storage"
      : "in-memory",
};

export default config;
