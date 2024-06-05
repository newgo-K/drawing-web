import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Shape } from "../types/shape";
import { MENU_TYPE } from "../types/menu";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";

const STORAGE_KEY = "shapes";

const useShapes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [shapes, setShapes] = useState<Map<number, Shape>>(() =>
    getLocalStorageItem(STORAGE_KEY)
  );

  useEffect(() => {
    setLocalStorageItem(STORAGE_KEY, shapes);
  }, [shapes]);

  const addShape = (shape: Shape) => {
    const newShape = { ...shape, id: Date.now() };

    setShapes(new Map(shapes.set(newShape.id, newShape)));
  };

  const allClear = () => {
    setShapes(new Map());
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const menuType = params.get("menu");

    switch (menuType) {
      case MENU_TYPE.ALL_CLEAR: {
        allClear();

        // 이전 메뉴와 동일할 경우 이벤트 발생이
        // 안되므로 qs menu 를 초기화
        params.delete("menu");
        navigate({ search: params.toString() }, { replace: true });
      }
    }
  }, [location.search, navigate]);

  return {
    shapes,
    addShape,
  };
};

export default useShapes;
