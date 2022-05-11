<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [bitburner](./bitburner.md) &gt; [Gang](./bitburner.gang.md) &gt; [getEquipmentCost](./bitburner.gang.getequipmentcost.md)

## Gang.getEquipmentCost() method

Get cost of equipment.

<b>Signature:</b>

```typescript
getEquipmentCost(equipName: string): number;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  equipName | string | Name of equipment. |

<b>Returns:</b>

number

Cost to purchase the specified Equipment/Augmentation (number). Infinity for invalid arguments

## Remarks

RAM cost: 2 GB

Get the amount of money it takes to purchase a piece of Equipment or an Augmentation. If an invalid Equipment/Augmentation is specified, this function will return Infinity.
