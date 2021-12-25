export default function PlaneMotion() {
  return (
    <div style={{ marginLeft: "5%", marginRight: "auto", bottom: "20%" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsLink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="400"
        viewBox="0 0 400 200"
      >
        <defs>
          <path id="basePath" d="M 50,150 A 280 500 0 0 1 350,150" />

          <mask id="mask">
            <use
              xlinkHref="#basePath"
              stroke-width="3"
              stroke="white"
              stroke-dasharray="1000,0"
              fill="none"
            >
              <animate
                attributeName="stroke-dasharray"
                from="0,348.5"
                to="348.5,0"
                begin="0s"
                dur="5s"
                fill="freeze"
              />
            </use>
          </mask>
        </defs>

        <circle r="4" cx="50" cy="150" fill="grey" />
        <circle r="4" cx="350" cy="150" fill="grey" />
        <use
          xlinkHref="#basePath"
          stroke-width="2"
          stroke-dasharray="10"
          stroke="grey"
          fill="none"
          mask="url(#mask)"
        />

        <path
          d="M 27,3 H 21 L 13,15 H 9 L 12,3 H 5 L 3,7 H -1 L 1,0 -1,-7 H 3 L 5,-3 H 12 L 9,-15 H 13 L 21,-3 H 27 C 33,-3 33,3 27,3 Z"
          fill="white"
          stroke="black"
          stroke-width="1.5"
        >
          <animateMotion
            rotate="auto"
            begin="0s"
            dur="5s"
            fill="freeze"
            repeatCount="indefinite"
          >
            <mpath xlinkHref="#basePath" />
          </animateMotion>
        </path>
      </svg>
    </div>
  );
}
