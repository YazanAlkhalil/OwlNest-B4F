import image from "../assets/images/OIG2 3.png";

function Sidebar({ links }) {
  return (
    <div className="flex flex-col items-center text-background  flex-grow bg-primary">
      <img className="box-border w-[90%] max-h-60" src={image} />
      <ul className='px-4'>
        {links.map((link) => (
          <li className="text-3xl mb-10" key={link.name}>
            <a href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
