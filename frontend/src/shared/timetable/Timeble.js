import React from "react";

function Table({ data }) {
  const getCourse = (d, p) => {
    let course = data.find((i) => i.day === d && i.period === p);
    return course ? course.courseID : "-";
  };
  return (
    <div className="content__container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">1</th>
            <th scope="col">2</th>
            <th scope="col">3</th>
            <th scope="col">4</th>
            <th scope="col"></th>
            <th scope="col">5</th>
            <th scope="col">6</th>
            <th scope="col">7</th>
            <th scope="col">8</th>
            <th scope="col"></th>
            <th scope="col">9</th>
            <th scope="col">10</th>
            <th scope="col">11</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Monday</th>
            <td>{getCourse(1, 1)}</td>
            <td>{getCourse(1, 2)}</td>
            <td>{getCourse(1, 3)}</td>
            <td>{getCourse(1, 4)}</td>
            <td>B</td>
            <td>{getCourse(1, 5)}</td>
            <td>{getCourse(1, 6)}</td>
            <td>{getCourse(1, 7)}</td>
            <td>{getCourse(1, 8)}</td>
            <td>L</td>
            <td>{getCourse(1, 9)}</td>
            <td>{getCourse(1, 10)}</td>
            <td>{getCourse(1, 11)}</td>
          </tr>
          <tr>
            <th scope="row">Tuesday</th>
            <td>{getCourse(2, 1)}</td>
            <td>{getCourse(2, 2)}</td>
            <td>{getCourse(2, 3)}</td>
            <td>{getCourse(2, 4)}</td>
            <td>R</td>
            <td>{getCourse(2, 5)}</td>
            <td>{getCourse(2, 6)}</td>
            <td>{getCourse(2, 7)}</td>
            <td>{getCourse(2, 8)}</td>
            <td>U</td>
            <td>{getCourse(2, 9)}</td>
            <td>{getCourse(2, 10)}</td>
            <td>{getCourse(2, 11)}</td>
          </tr>
          <tr>
            <th scope="row">Wednesday</th>
            <td>{getCourse(3, 1)}</td>
            <td>{getCourse(3, 2)}</td>
            <td>{getCourse(3, 3)}</td>
            <td>{getCourse(3, 4)}</td>
            <td>E</td>
            <td>{getCourse(3, 5)}</td>
            <td>{getCourse(3, 6)}</td>
            <td>{getCourse(3, 7)}</td>
            <td>{getCourse(3, 8)}</td>
            <td>N</td>
            <td>{getCourse(3, 9)}</td>
            <td>{getCourse(3, 10)}</td>
            <td>{getCourse(3, 11)}</td>
          </tr>

          <tr>
            <th scope="row">Thursday</th>
            <td>{getCourse(4, 1)}</td>
            <td>{getCourse(4, 2)}</td>
            <td>{getCourse(4, 3)}</td>
            <td>{getCourse(4, 4)}</td>
            <td>A</td>
            <td>{getCourse(4, 5)}</td>
            <td>{getCourse(4, 6)}</td>
            <td>{getCourse(4, 7)}</td>
            <td>{getCourse(4, 8)}</td>
            <td>C</td>

            <td>{getCourse(4, 9)}</td>
            <td>{getCourse(4, 10)}</td>
            <td>{getCourse(4, 11)}</td>
          </tr>
          <tr>
            <th scope="row">Friday</th>
            <td>{getCourse(5, 1)}</td>
            <td>{getCourse(5, 2)}</td>
            <td>{getCourse(5, 3)}</td>
            <td>{getCourse(5, 4)}</td>
            <td>K</td>
            <td>{getCourse(5, 5)}</td>
            <td>{getCourse(5, 6)}</td>
            <td>{getCourse(5, 7)}</td>
            <td>{getCourse(5, 8)}</td>
            <td>H</td>
            <td>{getCourse(5, 9)}</td>
            <td>{getCourse(5, 10)}</td>
            <td>{getCourse(5, 11)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
