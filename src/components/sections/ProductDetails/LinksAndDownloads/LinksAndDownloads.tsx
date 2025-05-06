interface LinksAndDownloadsProps {
  values: string[]
}
interface LinksAndDownloadsType {
  title: string
  url: string
  text: string
}
const LinksAndDownloads = ({ values }: LinksAndDownloadsProps) => {
  const json = JSON.parse(values[0])

  return (
    <div data-fs-links-and-downloads>
      {json.map((element: LinksAndDownloadsType, index: number) => (
        <div key={index} className="container">
          <a href={element.url}>{element.title}</a>
          <span>{element.text}</span>
        </div>
      ))}
    </div>
  )
}

export default LinksAndDownloads
