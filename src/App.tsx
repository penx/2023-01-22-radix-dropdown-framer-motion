import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [selected, setSelected] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleSelect(item: number) {
    setSelected(item);
    setOpen(false);
  }

  return (
    <div className="canvas">
      <div className="panel">
        <header className="header">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger className="dropdown__trigger">
              
            </DropdownMenu.Trigger>
            <>
              <>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    align="start"
                    ref={contentRef}
                    className="dropdown__content"
                  >
                    <>
                      <Item onSelect={() => handleSelect(1)}>Item 1</Item>
                      <Item onSelect={() => handleSelect(2)}>Item 2</Item>
                      <Item
                        onSelect={() => {
                          handleSelect(3);
                          contentRef.current?.addEventListener(
                            "animationend",
                            () => alert(";)"),
                            { once: true }
                          );
                        }}
                      >
                        Item 3
                      </Item>
                    </>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </>
            </>
          </DropdownMenu.Root>
        </header>
        <div className="message">
          <p>{selected ? "Clicked item " + selected : "Select an item"}</p>
        </div>
      </div>
    </div>
  );
}

const Item = (
  props: DropdownMenu.DropdownMenuItemProps & { onSelect?: () => void }
) => {
  return (
    <DropdownMenu.Item
      {...props}
      className="dropdown__item"
      onSelect={(
        event: Event & {
          currentTarget?:
            | null
            | (Event["currentTarget"] & { classList?: DOMTokenList });
        }
      ) => {
        event.currentTarget?.classList?.add("press");
        event.preventDefault();
      }}
      onAnimationEnd={(event) => {
        event.currentTarget.classList.remove("press");
        props.onSelect?.();
      }}
    />
  );
};
