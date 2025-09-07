const FileDisplay = ({ file }) => {
  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return "🖼️";
    if (type.includes("pdf")) return "📄";
    if (type.includes("word") || type.includes("doc")) return "📝";
    if (type.includes("excel") || type.includes("sheet")) return "📊";
    return "📎";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-w-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{getFileIcon(file.type)}</span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{file.name}</div>
          <div className="text-xs text-gray-500">
            {formatFileSize(file.size)} •{" "}
            {file.type.split("/")[1]?.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDisplay;
