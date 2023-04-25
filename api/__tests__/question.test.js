const buildFastify = require("../app");

const app = buildFastify({}, (testing = true));

afterAll(() => app.close());

test("Create Question test", async () => {
  const data = {
    p_text: "Prueba",
    id_area: 1,
    camera: 1,
    btn_na: 1,
    picture: "123.png",
    q_order: 5,
  };

  try {
    await request(app).post("/question/postQuestion").send(data);
    expect(response.statusCode).toBe(200);
  } catch (err) {
    console.log(`Error ${err}`);
  }
});

test("Create Question Fail test", async () => {
  const data = {
    p_text: null,
    id_area: 1,
    camera: 1,
    btn_na: 1,
    picture: "123.png",
    q_order: 5,
  };

  try {
    await request(app).post("/question/postQuestion").send(data);
    expect(response.statusCode).not.toBe(200);
  } catch (err) {
    console.log(`Error ${err}`);
  }
});
