import styled from "styled-components";

const ProgressbarContainer = styled.div`
  display: flex;
  padding: 0.75em;
  background: white;

  .progressbar {
    border: 1px solid gray;
    border-radius: 5px;
    width: 100%;
    background: white;
  }
  .progressbar-contents {
    height: 25px;
  }
  & > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 5.5em;
    text-align: center;
    font-size: 0.8em;
  }
`;

interface ProgressbarProps {
  value: number;
  max: number;
}

export default function Progressbar({ value, max }: ProgressbarProps) {
  const getWidth = () => {
    if (!max) {
      return "0";
    }

    return (value / max) * 100 + "%";
  };

  const getBackgroundColor = () => {
    const percent = Math.round((value / max) * 100);
    return percent <= 6
      ? "#FB041E"
      : percent > 6 && percent <= 12
        ? "#FD2222"
        : percent > 12 && percent <= 18
          ? "#FC4926"
          : percent > 18 && percent <= 24
            ? "#FC6628"
            : percent > 24 && percent <= 30
              ? "#FE882A"
              : percent > 30 && percent <= 36
                ? "#FFA52E"
                : percent > 36 && percent <= 42
                  ? "#FEC230"
                  : percent > 42 && percent <= 48
                    ? "#FFDE34"
                    : percent > 48 && percent <= 54
                      ? "#F4DE2B"
                      : percent > 54 && percent <= 60
                        ? "#E7DD25"
                        : percent > 60 && percent <= 66
                          ? "#DBDD1C"
                          : percent > 66 && percent <= 72
                            ? "#CEDC18"
                            : percent > 72 && percent <= 78
                              ? "#C3DC0E"
                              : percent > 78 && percent <= 84
                                ? "#B6DC07"
                                : percent > 84 && percent <= 90
                                  ? "#A9DC03"
                                  : "#9ADA00";
  };

  return (
    <ProgressbarContainer>
      <div className="progressbar">
        <div
          className="progressbar-contents"
          style={{
            width: getWidth(),
            backgroundColor: getBackgroundColor(),
          }}
        ></div>
      </div>
      {!!max && <span>{`${value} / ${max}`}</span>}
    </ProgressbarContainer>
  );
}
