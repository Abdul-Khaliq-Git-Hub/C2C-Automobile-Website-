export default function HrTag() {
  const ColoredLine = ({ color }: { color: string }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
        border: "none",
      }}
    />
  );

  return (
    <div>
      <ColoredLine color="black" />
    </div>
  );
}
