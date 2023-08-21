import { List } from "../../src/list/List"

describe("List", () => {
  beforeEach(async () => {
    // Nothing
  })

  const list1 = new List<number>()
  const list2 = list1.add(10)
  const list3 = list2.add(20)
  const list4 = list3.removeAt(0)

  // console.log(list1.toArray())  // []
  // console.log(list2.toArray())  // [10]
  // console.log(list3.toArray())  // [10, 20]
  // console.log(list4.toArray())  // [20]

  it("new list", () => {
    expect(list1).toEqual({ items: [] })
  })

  it("list of 10", () => {
    expect(list2).toEqual({ items: [10] })
  })

  it("list of 10, 20", () => {
    expect(list3).toEqual({ items: [10, 20] })
  })

  it("list of 20", () => {
    expect(list4).toEqual({ items: [20] })
  })
})
