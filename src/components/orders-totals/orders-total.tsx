
export default function OrdersTotal(props: { title: string, number: number }) {
  const info = props;

  return (
    <li>
      <h2 className="text text_type_main-medium">{info.title}</h2>
      <p className="text text_type_digits-large">{info.number}</p>
    </li>
  );
}

