import {
  createCharacterValue,
} from "../../Services/DataService";
import CharacterValueTypes from "../../Interfaces/CharacterValueTypes"

describe("createCharacterValue", () => {
  const mockData = [
    "Standing Light Punch5LP \n5LPStanding Light Punch\n\n\n\nStartup\n\nActive\n\nRecovery\n\nCancel\n\nDamage\n\nGuard\n\nOn Hit\n\nOn Block\n\n\n4\n\n3\n\n7\n\nch sp su\n\n300\n\nLH\n\n+4\n\n-1\n\nChains into 5LP/2LP/2LK\nCancel reaction window: 13f\n\nFrame data is mostly identical to 2LP, but 5LP is the preferred chain for countering Drive Impact since it has lower recovery. Can get a 3-hit light confirm with 5LP x3.\n\n",
    "Standing Medium Punch5MP \n5MPStanding Medium Punch\n\n\n\nStartup\n\nActive\n\nRecovery\n\nCancel\n\nDamage\n\nGuard\n\nOn Hit\n\nOn Block\n\n\n6\n\n4\n\n11\n\nsp su tc\n\n600\n\nLH\n\n+7\n\n-1\n\nCancel reaction window: 16f (18f TC)\n\nRyu's main combo starter, but the distance after a hit can make the followups a bit finicky. The Fuwa Triple Strike target combo is the most consistent ender and is easier to hitconfirm, but does fairly low damage.\nThe link into 4HP only works from absolute point blank, and even starting with a jumpin can prevent it from working. The link into 5MP or 2MP works from slightly farther out. On Counterhit, 5MP can link into 2HP if close enough (for example, blocked Drive Rush 5LP > CH 5MP links into 2HP, but without the Drive Rush Ryu will be too far away).\n\n",
    "Hadoken236P \n\n \n236LPHadoken\n\n\n\nStartup\n\nActive\n\nRecovery\n\nCancel\n\nDamage\n\nGuard\n\nOn Hit\n\nOn Block\n\n\n16\n\n-\n\n31\n\nsu3\n\n600\n\nLH\n\n-1\n\n-5\n\n1-hit projectile, slow speed\nCancel reaction window: 4f (Super)\n236MPHadoken\n\n\n\nStartup\n\nActive\n\nRecovery\n\nCancel\n\nDamage\n\nGuard\n\nOn Hit\n\nOn Block\n\n\n14\n\n-\n\n33\n\nsu3\n\n600\n\nLH\n\n-3\n\n-7\n\n1-hit projectile, medium speed\nCancel reaction window: 4f (Super)\n236HPHadoken\n\n\n\nStartup\n\nActive\n\nRecovery\n\nCancel\n\nDamage\n\nGuard\n\nOn Hit\n\nOn Block\n\n\n12\n\n-\n\n35\n\nsu3\n\n600\n\nLH\n\n-5\n\n-9\n\n1-hit projectile, fast speed\nCancel reaction window: 4f (Super)\n236PPHadoken\n\n\n\nStartup\n\nActive\n\nRecovery\n\nCancel\n\nDamage\n\nGuard\n\nOn Hit\n\nOn Block\n\n\n12\n\n-\n\n28\n\nsu2 su3\n\n400x2\n\nLH\n\nKD +54\n\n-1\n\n2-hit projectile, fast speed; has juggle potential\nPuts opponent into limited juggle state on hit\nCancel reaction window: 12f (Super)\n\nRyu's iconic fireball used primarily for zoning. Mixing up between the varying projectile speeds makes it harder for the opponent to navigate through the fireball game. The LP version is safest, and when used at long range it gives Ryu much more freedom to set up optimal spacing while the opponent is stuck in blockstun. The OD version is fast and higher priority, making it an important tool against other zoners, and the knockdown time lets Ryu perform a Denjin Charge. If the opponent is cornered, OD Hadoken can also juggle into Lv.1 Super on reaction.\n\n"
  ]
  test("create Values with empty data", () => {
    const result = createCharacterValue([]);
    expect(result.length).toBe(0);
  });

  test("create Values with mockData", () =>{
    const result = createCharacterValue(mockData)
    expect(result[0].Active).toBe("3")
    expect(result[0].Startup).toBe("4")
    expect(result[0].Cancel).toBe("ch sp su")
    expect(result[0].Name).toBe("Standing Light Punch")
    expect(result[0].key).toBe("0")
    expect(result[0].Input).toBe("5LP")
    expect(result[0].OnBlock).toBe("-1")
    expect(result[0].OnHit).toBe("+4")
    expect(result[0].Guard).toBe("LH")
    expect(result[0].Damage).toBe("300")
    expect(result[0].Recovery).toBe("7")
  })

  test("create Values with mockData where string = multiple moves", () =>{
    const result = createCharacterValue([mockData[2]])
    expect(result.length).toBe(4)
  })
});

export {};
