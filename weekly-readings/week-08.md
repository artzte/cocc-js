# Week 8 Reading Summary: Classes and Object-Oriented Programming

**Sources**:
* *You Don't Know JS Yet: Get Started* — Chapter 2: Surveying JS (Classes portion)
* *You Don't Know JS Yet: Get Started* — Chapter 3: Digging to the Roots of JS (`this` Keyword & Prototypes portion)
* *You Don't Know JS Yet: Get Started* — Chapter 4: The Bigger Picture (Pillar 2: Prototypes)

---

### 1. Classes and Object-Oriented Programming (OOP)
* **Definition**: A class is a template defining a custom data structure that bundles data (properties) and behavior (methods) together. It is instantiated to create concrete objects using the `new` keyword.
* **Constructor**: A special class method (`constructor`) called automatically during instantiation to initialize instance properties.
* **Static Members**: Declared with the `static` keyword, these methods/properties belong to the class constructor function itself rather than instances.
* **Inheritance & Polymorphism**:
  * Classes inherit from parent classes using the `extends` keyword.
  * Child class constructors must invoke `super(...)` to execute the parent class constructor before referencing `this`.
  * Overridden child methods can delegate back to the parent implementation using `super.methodName()`.
  * **Polymorphism**: The ability for different classes in an inheritance chain to define their own specific behaviors for a method sharing the same name.

---

### 2. The `this` Keyword (Execution Context)
* **What `this` Is Not**: `this` does **not** refer to the function itself, nor does it refer to the lexical instance the method is written inside.
* **Dynamic Context**: Lexical scope is static (defined at author time via code location). In contrast, `this` is a dynamic execution context determined **each time a function is called**, depending on how it was invoked.
* **Invocation Variations**:
  1. **Default Binding**: Called as a standalone function (e.g., `foo()`). `this` defaults to the global object (`window` or `globalThis`) in non-strict mode, or `undefined` in strict mode.
  2. **Implicit Binding**: Called as a method on an object (e.g., `obj.foo()`). `this` binds to the object preceding the dot (`obj`).
  3. **Explicit Binding**: Invoked using `.call(obj)` or `.apply(obj)`. `this` is explicitly bound to the passed object (`obj`).

---

### 3. Prototypes and Behavior Delegation
* **Prototype Linkage**: A prototype is a hidden link connecting one object to another. A chain of these linked objects is called the **prototype chain**. The default base of this chain is `Object.prototype`.
* **Behavior Delegation**: When a property or method access fails on an object, the lookup is delegated up the prototype chain to see if a linked ancestor has it.
  * `Object.create(parent)`: Creates a new, empty object prototype-linked to the specified `parent` object.
  * `Object.create(null)`: Creates a standalone object with no prototype linkage (no inherited methods like `toString()`).
* **Property Shadowing**: Assigning a value to a property on a child object creates that property directly on the child. It "shadows" any property of the same name on the prototype parent without mutating the parent.
* **The Synergy of `this` and Prototypes**:
  * Dynamic `this` is what makes prototype delegation powerful.
  * If `child` delegates a method call to `parent.method()`, the invocation `child.method()` ensures `this` inside the method still refers to `child`. This allows sharing a single method across multiple linked instances while operating on their unique data.
