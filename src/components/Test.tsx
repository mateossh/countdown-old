import * as React from "react";

export interface TestProps { sth: string; }

export const Test = (props: TestProps) => <p>
This is TypeScript test. Props.sth: {props.sth}
</p>;
